import { NextResponse } from "next/server";
import { Response } from "../models/response";

export const responseData = <T>(response: Response<T>) => {
    return NextResponse.json(response);
};