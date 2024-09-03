import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator";
import { replicate } from "@/lib/replicate";
import {z} from "zod"
import { verifyAuth } from "@hono/auth-js";
const app = new Hono()
    .post(
      "/remove-bg",
      verifyAuth(),
      zValidator(
        "json",
        z.object({
          image: z.string()
        })
      ),
      async (c) => {
        const {image} = c.req.valid("json");
        const input =   {
          image: image
        }
        const output: unknown = await replicate.run(
          "growthmkt/bg-remover:8bce2b8570544871acf2e854859969dfc8861f588674530a24fa8b173b009177",
          {
            input
          }
        );
        const res = output as string;

        return c.json({data: res})
      }
    )
    .post(
        "/generate-image",
        verifyAuth(),
        // Add verification
        zValidator(
            "json",
            z.object({
                prompt: z.string()
            })
        ),
        async (c) => {
            const {prompt} = c.req.valid("json");

            const output = await replicate.run(
                "janghaludu/kocchaga:ae678e06c905f559a9a6de4a7a25079eeebb48e64fc66b923bfc631cc80f821d",
                {
                  input: {
                    model: "dev",
                    prompt: prompt,
                    extra_lora: "andreasjansson/flux-shapes",
                    lora_scale: 0.7,
                    num_outputs: 4,
                    aspect_ratio: "1:1",
                    output_format: "webp",
                    guidance_scale: 3.5,
                    output_quality: 100,
                    extra_lora_scale: 0.7,
                    num_inference_steps: 28
                  }
                }
              );
              const res = output as Array<String>;
              return c.json({data: res[0]})
        }

    )
export default app;