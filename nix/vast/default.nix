{ stdenv
, lib
, vast-source
, nix-gitignore
, cmake
, cmake-format
, pkg-config
, git
, pandoc
, caf
, libpcap
, arrow-cpp
, fast_float
, flatbuffers
, spdlog
, libyamlcpp
, simdjson
, robin-map
, jemalloc
, libunwind
, xxHash
, python3
, jq
, tcpdump
, dpkg
, restinio
, versionOverride ? null
, versionShortOverride ? null
, extraPlugins ? []
, extraCmakeFlags ? []
, disableTests ? true
, pkgsBuildHost
}:
let
  inherit (stdenv.hostPlatform) isStatic;
  isCross = stdenv.buildPlatform != stdenv.hostPlatform;

  py3 = (python3.withPackages(ps: with ps; [
    coloredlogs
    jsondiff
    pyarrow
    pyyaml
    schema
  ]));

  src = vast-source;

  versionOverride' = lib.removePrefix "v" versionOverride; 
  versionShortOverride' = lib.removePrefix "v" versionShortOverride; 
  versionFallback = (builtins.fromJSON (builtins.readFile ./../../version.json)).vast-version-fallback;
  version = if (versionOverride != null) then versionOverride' else versionFallback;
  versionShort = if (versionShortOverride != null) then versionShortOverride' else version;

  plugins = [
    "plugins/cef"
    "plugins/parquet"
    "plugins/pcap"
    "plugins/sigma"
    "plugins/web"
  ] ++ extraPlugins;
in

stdenv.mkDerivation (rec {
  inherit src version;
  pname = "vast";
  outputs = [ "out" ] ++ lib.optionals isStatic [ "package" ];

  preConfigure = ''
    substituteInPlace plugins/pcap/cmake/FindPCAP.cmake \
      --replace /bin/sh "${stdenv.shell}" \
      --replace nm "''${NM}"
  '';

  nativeBuildInputs = [
    cmake
    cmake-format
    dpkg
  ];
  propagatedNativeBuildInputs = [ pkg-config pandoc ];
  buildInputs = [
    fast_float
    jemalloc
    libpcap
    libunwind
    libyamlcpp
    robin-map
    simdjson
    spdlog
    restinio
  ];
  propagatedBuildInputs = [
    arrow-cpp
    caf
    flatbuffers
    xxHash
  ];

  cmakeFlags = [
    "-DCMAKE_FIND_PACKAGE_PREFER_CONFIG=ON"
    "-DCAF_ROOT_DIR=${caf}"
    "-DVAST_VERSION_TAG=v${version}"
    "-DVAST_VERSION_SHORT=v${versionShort}"
    "-DVAST_ENABLE_RELOCATABLE_INSTALLATIONS=${if isStatic then "ON" else "OFF"}"
    "-DVAST_ENABLE_BACKTRACE=ON"
    "-DVAST_ENABLE_JEMALLOC=ON"
    "-DVAST_ENABLE_LSVAST=ON"
    "-DVAST_ENABLE_VAST_REGENERATE=OFF"
    "-DVAST_ENABLE_BUNDLED_AND_PATCHED_RESTINIO=OFF"
    "-DVAST_PLUGINS=${lib.concatStringsSep ";" plugins}"
    # TODO limit this to just web plugin
    "-DVAST_WEB_UI_BUNDLE=${pkgsBuildHost.vast-ui}"
  ] ++ lib.optionals isStatic [
    "-DBUILD_SHARED_LIBS:BOOL=OFF"
    "-DCMAKE_INTERPROCEDURAL_OPTIMIZATION:BOOL=ON"
    "-DCPACK_GENERATOR=TGZ;DEB"
    "-DCPACK_PACKAGE_NAME=vast"
    "-DVAST_ENABLE_STATIC_EXECUTABLE:BOOL=ON"
    "-DVAST_PACKAGE_FILE_NAME_SUFFIX=static"
  ] ++ lib.optionals stdenv.hostPlatform.isx86_64 [
    "-DVAST_ENABLE_SSE3_INSTRUCTIONS=ON"
    "-DVAST_ENABLE_SSSE3_INSTRUCTIONS=ON"
    "-DVAST_ENABLE_SSE4_1_INSTRUCTIONS=ON"
    "-DVAST_ENABLE_SSE4_1_INSTRUCTIONS=ON"
    # AVX and up is disabled for compatibility.
    "-DVAST_ENABLE_AVX_INSTRUCTIONS=OFF"
    "-DVAST_ENABLE_AVX2_INSTRUCTIONS=OFF"
  ] ++ lib.optionals disableTests [
    "-DVAST_ENABLE_UNIT_TESTS=OFF"
  ] ++ extraCmakeFlags;

  # The executable is run to generate the man page as part of the build phase.
  # libvast.{dyld,so} is put into the libvast subdir if relocatable installation
  # is off, which is the case here.
  preBuild = lib.optionalString (!isStatic) ''
    export LD_LIBRARY_PATH="$PWD/libvast''${LD_LIBRARY_PATH:+:}$LD_LIBRARY_PATH"
    export DYLD_LIBRARY_PATH="$PWD/libvast''${DYLD_LIBRARY_PATH:+:}$DYLD_LIBRARY_PATH"
  '';

  hardeningDisable = lib.optional isStatic "pic";

  fixupPhase = lib.optionalString isStatic ''
    rm -rf $out/nix-support
  '';

  doCheck = false;
  checkTarget = "test";

  dontStrip = true;

  doInstallCheck = false;
  installCheckInputs = [ py3 jq tcpdump ];
  # TODO: Investigate why the disk monitor test fails in the build sandbox.
  installCheckPhase = ''
    python ../vast/integration/integration.py \
      --app ${placeholder "out"}/bin/vast \
      --disable "Disk Monitor"
  '';

  meta = with lib; {
    description = "Visibility Across Space and Time";
    homepage = "https://vast.io/";
    license = licenses.bsd3;
    platforms = platforms.unix;
    maintainers = with maintainers; [ tobim ];
  };
} // lib.optionalAttrs isStatic {
  installPhase = ''
    runHook preInstall
    cmake --install . --component Runtime
    cmakeFlagsArray+=(
      "-UCMAKE_INSTALL_BINDIR"
      "-UCMAKE_INSTALL_SBINDIR"
      "-UCMAKE_INSTALL_INCLUDEDIR"
      "-UCMAKE_INSTALL_OLDINCLUDEDIR"
      "-UCMAKE_INSTALL_MANDIR"
      "-UCMAKE_INSTALL_INFODIR"
      "-UCMAKE_INSTALL_DOCDIR"
      "-UCMAKE_INSTALL_LIBDIR"
      "-UCMAKE_INSTALL_LIBEXECDIR"
      "-UCMAKE_INSTALL_LOCALEDIR"
      "-DCMAKE_INSTALL_PREFIX=/opt/vast"
    )
    echo "cmake flags: $cmakeFlags ''${cmakeFlagsArray[@]}"
    cmake "$cmakeDir" $cmakeFlags "''${cmakeFlagsArray[@]}"
    cmake --build . --target package
    install -m 644 -Dt $package package/*.deb package/*.tar.gz
    runHook postInstall
  '';
})
