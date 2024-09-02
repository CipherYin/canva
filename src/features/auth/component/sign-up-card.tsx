import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Link from "next/link";

const SignUpCard = () => {
    const onProviderSignUp = (provider: "github" | "google") => {
        signIn(provider, { callbackUrl: "/" });
      };
    return (
    <Card className="w-full h-full p-8">
        <CardHeader className="px-0 pt-0 items-center">
            <CardTitle>创建一个账户</CardTitle>
            {/* <CardDescription>使用邮箱或其他方式注册</CardDescription> */}
        </CardHeader>
        <CardContent className="space-y-5 px-0 pb-0">
            <div className="flex flex-col gap-y-2.5">
                {/* <Button
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                >
                    <FcGoogle
                        className="mr-2 size-5 top-2.5 left-2.5 absolute"
                    />
                    使用Google账号登陆
                </Button> */}
                <Button
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                >
                    <FaGithub
                        className="mr-2 size-5 top-2.5 left-2.5 absolute"
                    />
                    使用Github注册
                </Button>
                
            </div>
            <p className="text-xs text-muted-foreground text-right">
                已有账号？
                <Link href="/sign-in">
                    <span className="text-sky-700 hover:underline">登陆</span>
                </Link>
            </p>
        </CardContent>
       
    </Card>
    );
}
 
export default SignUpCard;