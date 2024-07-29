#!/bin/sh

rm -rf dist
cd packages
for package in *
do
    cd $package
    pnpm pack --pack-destination ../../dist
    cd ../../dist
    tar xf *.tgz
    rm *.tgz
    mv package $package
    cd ../packages
done


