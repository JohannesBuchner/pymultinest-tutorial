#!/bin/bash
#
# This script will download and install MultiNest and pymultinest for you
# The installation does not require root privileges
#
# I downloaded MultiNest_v3.4 from http://ccpforge.cse.rl.ac.uk/gf/project/multinest/
# because the system does not have cmake.
# 

pushd /afs/desy.de/group/school/mc-school/multinest-install/ > /dev/null || exit 1

echo ">> downloading MultiNest..."
#git clone https://github.com/JohannesBuchner/MultiNest
pushd MultiNest_v3.4 > /dev/null
echo ">> building MultiNest..."
make libnest3.so >/dev/null &&
[ -e libmultinest.so ] || ln -s libnest3.so libmultinest.so
DIR=$PWD
popd > /dev/null

echo ">> downloading PyMultiNest..."
[ -e PyMultiNest ] || git clone https://github.com/JohannesBuchner/PyMultiNest
pushd PyMultiNest > /dev/null
echo ">> installing PyMultiNest..."
python setup.py install --user > /dev/null 
popd > /dev/null

popd > /dev/null

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


