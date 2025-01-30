import { createSubjects } from "@openauthjs/openauth/subject"
import { object, string } from "valibot"

export let authSubjects = createSubjects({
  user: object({
    id: string(),
  }),
})
