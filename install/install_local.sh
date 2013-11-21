#!/bin/bash
#
# This script will download and install MultiNest and pymultinest for you
# The installation does not require root privileges
#

rm -rf download
mkdir -p download

pushd download

echo ">> downloading MultiNest..."
git clone https://github.com/JohannesBuchner/MultiNest
pushd MultiNest
DIR=$PWD/lib/
cd build
echo ">> building MultiNest..."
cmake .. > /dev/null && make > /dev/null
popd

echo ">> downloading PyMultiNest..."
git clone https://github.com/JohannesBuchner/PyMultiNest
pushd PyMultiNest
echo ">> installing PyMultiNest..."
python setup.py install --user > /dev/null 
popd

popd

echo ">> installing into ~/.bash_profile ..."
line="export LD_LIBRARY_PATH=\$LD_LIBRARY_PATH:$DIR"
line2="export PATH=\$LD_LIBRARY_PATH:\$HOME/.local/bin/"
echo ">> use: $ $line"
echo ">> use: $ $line2"
grep -v "$line" ~/.bash_profile |grep -v "$line2" > ~/.bash_profile.new
mv ~/.bash_profile.new ~/.bash_profile
echo "$line" >> ~/.bash_profile
echo "$line2" >> ~/.bash_profile

echo ">> done."

