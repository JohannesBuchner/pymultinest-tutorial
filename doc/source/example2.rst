Example 2: Gaussian Emission lines
=============================================

1. Generating data
	In the folder example2, find and run lines_generate.py.
	It will generate data for you.

2. View the data

	Take a look at one of the generated data sets: "out/spectrum01".

3. Analysing a data set

	In the folder example2, I started the script lines.py,
	which allows you to analyse data with the model of a single gaussian line:
	
	.. literalinclude:: ../../example2/lines.py
		:language: python

Your task
---------------------

1. Apply the script to the dataset 'spectrum01'
2. As in :doc:`example1`, plot and look at the marginal parameter distributions.
3. What is the evidence for this model?
4. **Extend the model to 2 gaussian lines.**
5. Are 2 gaussian lines preferred? I.e. is the evidence higher?
6. Are 3 gaussian lines preferred?
7. Analyse the other datasets. Are the results the same?

Continue with :doc:`example3` ...

