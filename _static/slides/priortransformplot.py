import matplotlib.lines
import matplotlib.pyplot as plt
import numpy
import scipy, scipy.stats

u = scipy.stats.uniform(1, 2)
x = numpy.linspace(0, 4, 10000)

plt.figure(figsize=(8, 2))
plt.subplot(2, 2, 1)
plt.title(r'PDF Uniform $\propto 1$')
plt.plot(x, u.pdf(x), '-', color='b', lw=4)
plt.yticks([])
plt.xticks(range(1,4))
plt.subplot(2, 2, 2)
plt.title(r'CDF Uniform $\propto x$')
plt.plot(x, u.cdf(x), '-', color='b', lw=4)
plt.xticks(range(1,4))
ax = plt.gca()
l = matplotlib.lines.Line2D((0, u.ppf(0.3)), (0.3, 0.3), linewidth=1, color='r', linestyle=':')
ax.add_line(l)
l = matplotlib.lines.Line2D((u.ppf(0.3), u.ppf(0.3)), (0.3, 0.0), linewidth=1, color='r', linestyle=':')
ax.add_line(l)
plt.savefig("prior_transform_uniform.png", bbox_inches='tight')
plt.savefig("prior_transform_uniform.pdf", bbox_inches='tight')
plt.close()

plt.figure(figsize=(8, 2))
plt.subplot(2, 2, 1)
plt.title(r'PDF Log-Uniform $\propto 1/x$')
p = 1./x
p[x < 0.1] = 0
p[x > 3] = 0
plt.plot(x, p, '-', color='b', lw=4)
#plt.gca().set_xscale('log')
plt.yticks([])
plt.xticks(range(1,4))
plt.subplot(2, 2, 2)
plt.title(r'CDF Log-Uniform $\propto {\ln x}$')
c = numpy.cumsum(p)
c = c / c.max()
plt.plot(x, c, '-', color='b', lw=4)
ax = plt.gca()
l = matplotlib.lines.Line2D((0, x[c > 0.8][0]), (0.8, 0.8), linewidth=1, color='r', linestyle=':')
ax.add_line(l)
l = matplotlib.lines.Line2D((x[c > 0.8][0], x[c > 0.8][0]), (0.8, 0.0), linewidth=1, color='r', linestyle=':')
ax.add_line(l)
plt.xticks(range(1,4))
plt.savefig("prior_transform_loguniform.png", bbox_inches='tight')
plt.savefig("prior_transform_loguniform.pdf", bbox_inches='tight')
plt.close()


