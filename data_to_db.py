import re
from itertools import islice

import dataset

DB_PATH = 'database.db'
CONNECTION_STRING = f'sqlite:///{DB_PATH}'

PULSAR_TABLE = 'pulsars'
PULSAR_PRIMARY_KEY = 'psrj'

PULSAR_FILE = 'data/psrcat.db'
COMMENT_CHAR = '#'
NEW_ENTRY_CHAR = '@'

LINE_SPLIT_RE = re.compile(r'\s+')

REF_CATCH_RE = re.compile(r'([^\[,]+)(\[[^\]]*\])?')
def drop_ref(s):
    match = REF_CATCH_RE.match(s)
    return match.group(1)
def drop_refs(s):
    matchiter = REF_CATCH_RE.finditer(s)
    return ';'.join([match.group(1) for match in matchiter])

FLOAT_FIELDS = {
    'posepoch', 'pepoch', # Epoch of position, epoch of period of frequency
    'elong', 'elat', # Ecliptic longitude and latitude (degrees)
    'pmra', 'pmdec', # Proper motion: right ascension direction, declination (mas/yr)
    'pmelong', 'pmelat', # Proper motion: ecl. lon and lat direction (mas/yr)
    'pmepoch', # Proper motion epoch
    'px', # Annual parallax (mas)

    'p0', 'p1', # Barycentric period (s), time derivative
    'f0', 'f1', 'f2', 'f3', 'f4', 'f5', # Barycentric rotation frequency (Hz), derivatives
    'dm', 'dm1', 'dm2', 'dm3', # Dispersion measure (cm^-3 pc), derivatives
    'rm', # Rotation measure (rad m^-2)
    's40', 's50', 's60', 's80', 's100', # Mean flux density at X MHz where X in sX (mJy)
    's150', 's200', 's300', 's400', 's600', 's700', 's800', 's900',
    's1400', 's1600', 's2000', 's3000', 's4000',
    's5000', 's6000', 's8000', 's9000',
    'w10', 'w50', # Width of pulse at 10%/50% peak (ms)
    'tau_sc', # Temporal broadening of pulses at 1GHz (s)

    'dist_a', 'dist_amn', 'dist_amx', 'dist_dm', # Distance: ???, min, max, YMW16 DM-based (kpc)
    'dmepoch', # DM distance epoch (?)

    'tasc', 'tasc_2', # Epoch of ascending node (MJD) - ELL1 binary model, first and second member
    'a1', 'a1_2', 'a1_3', # Projected semi-major axis of orbit for member X (lt s)
    'om', 'om_2', 'om_3', # Longtitude of periastron (degrees) for member X
    'eps1', 'eps1_2', 'eps2', 'eps2_2', # ECC x sin(OM) for member X - ELL1 binary model
    't0', 't0_2', 't0_3', # Epoch of periastron (MJD) for member X
    'pb', 'pb_2', 'pb_3', # Binary period (days) for member X
    'ecc', 'ecc_2', 'ecc_3', # Binary system eccentricity for member X
}

CONVERSIONS = {
    'nglt': int, # Number of glitches observed
    
    'type': drop_refs, # Type codes
    'assoc': drop_refs, # Associated other objects
    'bincomp': drop_ref, # Binary companion type
    'survey': lambda s: ';'.join(s.split(',')), # Surveys that detected the pulsar
}

WHITELIST = {
    *FLOAT_FIELDS,
    *CONVERSIONS.keys(),
    'psrj', # J-name
    'psrb', # B-name
    'raj', # Right ascension (J2000)
    'decj', # Declination (J2000)
    'units', # Timescale for period/freq. and epoch data; TCB or TDB
    'binary', # Binary model
    'clk', # Clock used?
    'ephem', # Ephemeris
}

def iter_pulsars(fname):
    skipped = set()
    with open(fname) as f:
        entry = {}
        for line in f:
            if line[0] == COMMENT_CHAR:
                continue
            if line[0] == NEW_ENTRY_CHAR:
                yield entry
                entry = {}
                continue

            tokens = LINE_SPLIT_RE.split(line)
            if len(tokens) < 2:
                continue

            key = tokens[0].lower()
            if key not in WHITELIST:
                skipped.add(key)
                continue

            val = tokens[1]
            if key in CONVERSIONS:
                val = CONVERSIONS[key](val)
            elif key in FLOAT_FIELDS:
                val = float(val)

            entry[key] = val

    print(f'Skipped fields: {", ".join(skipped)}')

def init_db(db):
    if PULSAR_TABLE in db and len(db[PULSAR_TABLE]) > 0: return
    if PULSAR_TABLE not in db: db.create_table(PULSAR_TABLE, PULSAR_PRIMARY_KEY, db.types.text)
    print(f'Loading data from {PULSAR_FILE} to DB...')
    with db as tx:
        for pulsar in iter_pulsars(PULSAR_FILE):
            tx[PULSAR_TABLE].upsert(pulsar, [PULSAR_PRIMARY_KEY])

def describe_db(db):
    print(f'Number of tables: {len(db.tables)}')
    for t in db.tables:
        print(f'- Table: {t}')
        print(f'  Columns: {len(db[t].columns)}, Rows: {len(db[t])}')

def sample_data(db, table):
    for c in db[table].columns:
        condition = {c: {'not': None}}
        candidates = db[table].find(**condition)
        samples = ', '.join([str(candidate[c]) for candidate in islice(candidates, 0, 5)])
        print(f'{c}: {samples}')

if __name__ == '__main__':
    db = dataset.connect(CONNECTION_STRING)
    init_db(db)
    print('Database ready!')
    describe_db(db)