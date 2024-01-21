import { z, type ZodRawShape, type EnumLike } from 'zod';

export const objectSchema = (obj: ZodRawShape) => z.object(obj);

export const intInRangeSchema = (min: number, max: number) => z.number().int().min(min).max(max);

export const intSchema = () => z.number().int();

export const enumSchema = (enumObj: EnumLike) => z.nativeEnum(enumObj);

export const stringSchema = () => z.string();

export const booleanSchema = () => z.boolean();

export const stringMaxLenSchema = (length: number) => z.string().max(length);

export const arraySchema = (schema: z.ZodTypeAny) => z.array(schema);

export const instanceOfSchema = (schema: Parameters<typeof z.instanceof>[0]) => z.instanceof(schema);
