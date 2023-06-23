import { z, type ZodRawShape, type EnumLike } from 'zod';

export const objectSchema = (obj: ZodRawShape) => z.object(obj);

export const intInRangeSchema = (min: number, max: number) => z.number().int().min(min).max(max);

export const enumSchema = (enumObj: EnumLike) => z.nativeEnum(enumObj);
