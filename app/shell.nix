{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    pkgs.turso-cli
    pkgs.nodePackages_latest.pnpm

  ];

  shellHook = ''
    echo "Environment ready with Node.js and pnpm";
    nu
  '';
}
