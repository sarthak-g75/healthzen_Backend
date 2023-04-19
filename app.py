import pickle
import sys
import numpy as np
import pandas as pd
import json

with open('model', 'rb') as f:
    mp = pickle.load(f)

print(mp.predict([[float(sys.argv[1]), float(sys.argv[2]), float(sys.argv[3]),
                            float(sys.argv[4]), float(sys.argv[5]), float(sys.argv[6]),
                            float(sys.argv[7]), float(sys.argv[8]),float(sys.argv[9]),
                            float(sys.argv[10]), float(sys.argv[11])]])[0])
