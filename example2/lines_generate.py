import json
import sys
import numpy
from numpy import log, exp, pi
import scipy.stats, scipy
import matplotlib.pyplot as plt

x = numpy.linspace(0, 1, 400)

noise = 0.1

# model for 2 gaussians, same width, fixed offset
def model(pos1, width, height1, height2):
	pos2 = pos1 + 0.05
	return  height1 * scipy.stats.norm.pdf(x, pos1, width) + \
		height2 * scipy.stats.norm.pdf(x, pos2, width)

numpy.random.seed(5)
for i in range(8):
	pos1 = numpy.random.uniform(0.1, 0.75)
	height1 = 10**numpy.random.uniform(-2.5, -2)
	width = (0.0001 / height1) + 0.0001
	height2 = height1 * pos1
	print '%02d %.2f %.4f %.4f %.4f' % (i+1, pos1, width, height1, height2)
	ymodel = model(pos1, width, height1, height2)
	ydata = numpy.random.normal(ymodel, noise)
	numpy.savetxt("out/spectrum%02d" % (i+1), ydata)
	plt.plot(x, ymodel, '-', color='blue', label='model: %f %f %f %f' % (pos1, width, height1, height2))
	plt.plot(x, ydata, '+ ', color='red', label='data')
	plt.savefig("out/spectrum%02d.eps" % (i+1))
	plt.close()




