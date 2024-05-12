import { GetBySessionTokenUseCase } from "@/features/user/domain/use-cases/get-by-session-token-use-case";
import { auth } from "@/root/auth";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const res = await req.json();

  if (!res?.sessionToken) {
    return NextResponse.json({ error: "Unauthorized1" }, { status: 401 });
  }

  const sessionUser = await new GetBySessionTokenUseCase().execute(res.sessionToken);

  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized2" }, { status: 401 });
  }

  return NextResponse.json({ success: true, data: sessionUser.toObject() }, { status: 200 });
};
