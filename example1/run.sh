# run the script
python 1d_multimodal.py
# analyse the output, which is in out/.
# multinest_marginals.py is a plotting tool that comes with pymultinest.
multinest_marginals.py out/
# open the marginal plots at marg.pdf
xdg-open out/marg.pdf

