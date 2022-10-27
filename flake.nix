{
  description = "VAST as a standalone app or NixOS module";

  nixConfig = {
    extra-substituters = "https://vast.cachix.org";
    extra-trusted-public-keys = "vast.cachix.org-1:0L8rErLUuFAdspyGYYQK3Sgs9PYRMzkLEqS2GxfaQhA=";
  };

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/104e8082de1b20f9d0e1f05b1028795ed0e0e4bc";
  inputs.flake-compat.url = "github:edolstra/flake-compat";
  inputs.flake-compat.flake = false;
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nix-filter.url = "github:numtide/nix-filter";

  outputs = { self, nixpkgs, flake-utils, nix-filter, flake-compat }@inputs: {
    nixosModules.vast = {
      imports = [
        ./nix/module.nix
      ];
      _module.args = {
        inherit (self.packages."x86_64-linux") vast;
      };
    };
  } // flake-utils.lib.eachSystem ["x86_64-linux"] (system:
    let
      overlay = import ./nix/overlay.nix { inherit inputs; };
      pkgs = nixpkgs.legacyPackages."${system}".appendOverlays [ overlay ];
      inherit (builtins.fromJSON (builtins.readFile ./version.json))
      vast-version-fallback vast-version-rev-count;
      # Simulate `git describe --abbrev=10 --long --match='v[0-9]*`.
      # We would like to simulate `--dirty` too, but that is currently not
      # possible (yet?: https://github.com/NixOS/nix/pull/5385).
      version = "${vast-version-fallback}"
        # If self.revCount is equal to the refCount of the tagged commit, then
        # self.rev must be the tagged commit and the fallback itself is the
        # correct version. If not we append the difference between both counts
        # and the abbreviated commit hash.
        + pkgs.lib.optionalString (self.revCount > vast-version-rev-count)
           "-${self.revCount - vast-version-rev-count}-g${builtins.substring 0 10 self.rev}";
    in
    rec {
      inherit pkgs;
      packages = flake-utils.lib.flattenTree {
        vast = pkgs.vast;
        vast-ci = pkgs.vast-ci;
        vast-static = pkgs.pkgsStatic.vast;
        vast-ci-static = pkgs.pkgsStatic.vast-ci;
        staticShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            git nixUnstable coreutils nix-prefetch-github
          ];
        };
        default = pkgs.vast;
      };
      apps.vast = flake-utils.lib.mkApp { drv = packages.vast; };
      apps.vast-static = flake-utils.lib.mkApp { drv = packages.vast-static; };
      apps.default = apps.vast;
      devShell = import ./shell.nix { inherit pkgs; };
      hydraJobs = { inherit packages; } // (
        let
          vast-vm-tests = nixpkgs.legacyPackages."${system}".callPackage ./nix/nixos-test.nix
            {
              # FIXME: the pkgs channel has an issue made the testing creashed
              makeTest = import (nixpkgs.outPath + "/nixos/tests/make-test-python.nix");
              inherit self pkgs;
            };
        in
        pkgs.lib.optionalAttrs pkgs.stdenv.isLinux {
          inherit (vast-vm-tests)
            vast-vm-systemd
            ;
        }
      );
    }
  );
}
