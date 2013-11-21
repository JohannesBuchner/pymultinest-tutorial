PyMultiNest installation
--------------------------

On the school computers
------------------------

1. Log in, and run the bash shell::

	$ ssh -Y schoolNN@naf-school01.desy.de
	[schoolNN@naf-school01]~% bash
	bash-4.1$ 

2. Load the environment::
	
	bash-4.1$ source /afs/desy.de/group/school/mc-school/setup_pymultinest.sh
	installing pymultinest ... installation successful
	configuring environment and testing ... ok
	schoolNN@naf-school01 ~ $

Go start with Example 1. 

If you have an up-to-date Linux System (e.g. Ubuntu), you
may install MultiNest and PyMultiNest locally.

On your own computer
----------------------------

The complete installation instructions are `here <http://johannesbuchner.github.io/PyMultiNest/install.html>`_, but for now you only need pymultinest.

1. MultiNest
	1. make sure you have cmake, the lapack-libraries and a fortran compiler installed::
	
		$ yum install cmake lapack-devel lapack blas blas-devel

	2. download MultiNest::
		
		$ git clone https://github.com/JohannesBuchner/MultiNest.git
	
	3. build MultiNest::
		
		$ cd MultiNest/build/
		$ cmake .. && make
	
	4. set the LD_LIBRARY_PATH environment variable to include libmultinest.so::
	
		$ export LD_LIBRARY_PATH=/my/directory/MultiNest/lib/:$LD_LIBRARY_PATH
	
	To not having to do the last step for every new shell, put it into ~/.bashrc as well

2. PyMultiNest
	1. make sure you have scipy and matplotlib installed::
	
		$ yum install python-matplotlib scipy numpy 
	
	2. fetch the PyMultiNest source::
	
		$ git clone https://github.com/JohannesBuchner/PyMultiNest.git

	3. install PyMultiNest::
		
		$ python setup.py install --user
	
	4. include multinest_marginals.py into your path::
	
		export PATH=$PATH:$HOME/.local/bin/

	To not having to do the last step for every new shell, put it into ~/.bashrc as well

On a Mac/Apple computer
-------------------------

Instructions are similar as above except for the differences noted `here <http://johannesbuchner.github.io/PyMultiNest/install.html#install-on-mac>`_. 

On an older Linux distribution
--------------------------------

If you do not have an up-to-date compiler, you might have trouble compiling MultiNest.

1. Get a copy of the (non-cmake) MultiNest_v3.4 either from /afs/desy.de/group/school/mc-school/multinest-install/MultiNest_v3.4 or from http://ccpforge.cse.rl.ac.uk/gf/project/multinest/
2. Go back to an older version of PyMultiNest, namely commit 70b43e3::

	$ git checkout 70b43e3

3. Build the bridge::

	$ MULTINEST=/my/directory/MultiNest/lib/ make -B -C multinest_bridge WITHOUT_MPI=1

4. continue as above with installing PyMultiNest (2.3.).


