import {auth} from "@/auth"
import { protectServer } from "@/features/auth/utils";
import Banner from "./banner";
import ProjectsSectionPage from "./projects-section";
import TemplatesSectionPage from "./templates-section";
export default async function Home() {
  await protectServer();

  const session = await auth();
  
  return (

    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
       <Banner/>
       <TemplatesSectionPage/>
       <ProjectsSectionPage/>
    </div>
  );
}
