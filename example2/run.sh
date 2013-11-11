
python lines_generate.py

xdg-open out/spectrum01.eps

python lines.py out/spectrum01

multinest_marginals.py out/spectrum01_1_

xdg-open out/spectrum01_1_marg.pdf
xdg-open out/spectrum01_1_posterior.pdf

python lines2.py out/spectrum01

multinest_marginals.py out/spectrum01_2_

xdg-open out/spectrum01_2_marg.pdf
xdg-open out/spectrum01_2_posterior.pdf


