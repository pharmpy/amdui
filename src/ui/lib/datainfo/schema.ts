export type Column = {
	name: string;
	type: Type;
	unit: Unit;
	continuous: boolean;
	scale: Scale;
	datatype: DataType;
	descriptor?: Descriptor;
	drop?: boolean;
};

export const types = [
	'id',
	'dv',
	'idv',
	'unknown',
	'dose',
	'ii',
	'event',
	'covariate',
	'mdv',
	'nmtran_date',
] as const;

export type Type = typeof types[number];

export const units = ['1', 'ml', 'mg', 'h', 'kg', 'mg/l'] as const;

export type Unit = typeof units[number];

export const nature = ['continuous', 'discrete'] as const;

export type Nature = typeof nature[number];

export const selection = ['keep', 'drop'] as const;

export type Selection = typeof selection[number];

export const scales = ['nominal', 'ordinal', 'interval', 'ratio'] as const;

export type Scale = typeof scales[number];

export const dtypes = [
	'int8',
	'int16',
	'int32',
	'int64',
	'uint8',
	'uint16',
	'uint32',
	'uint64',
	'float16',
	'float32',
	'float64',
	'float128',
	'nmtran-time',
	'nmtran-date',
] as const;

export type DataType = typeof dtypes[number];

export const descriptors = [
	'unknown',
	'age',
	'body weight',
	'lean body mass',
	'fat free mass',
] as const;

export type Descriptor = typeof descriptors[number];
