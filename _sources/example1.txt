Example 1: One-dimensional multi-modal problem
===============================================

Get a copy of the `tutorial example code <https://github.com/JohannesBuchner/pymultinest-tutorial>`_::

   $ git clone https://github.com/JohannesBuchner/pymultinest-tutorial

In the folder example1, find the file 1d_multimodal.py. It illustrates how to call pymultinest with

* one dimension only
* a uniform prior
* some made-up likelihood function

.. literalinclude:: ../../example1/1d_multimodal.py

Your task
-----------

1. Study the example to understand how to call pymultinest. 
2. Run it, and analyse the output with multinest_marginals.py
	.. literalinclude:: ../../example1/run.sh
		:language: bash

3. (optional) compare with the minimal demo script of pymultinest `pymultinest_demo_minimal.py <https://github.com/JohannesBuchner/PyMultiNest/blob/master/pymultinest_demo_minimal.py>`_. 
	The not-so-minimal demo at `pymultinest_demo.py <https://github.com/JohannesBuchner/PyMultiNest/blob/master/pymultinest_demo.py>`_ shows how to do plotting yourself, and how to access the computed evidence.

Continue with :doc:`example2` ...



