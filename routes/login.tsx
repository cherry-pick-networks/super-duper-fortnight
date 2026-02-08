import { Handlers } from "fresh";

export const handler: Handlers = {
  GET() {
    return Response.redirect("/account/login", 307);
  },
};

export default function LoginRedirect() {
  return null;
}
