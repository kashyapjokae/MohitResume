import ResumeView from "@/components/ResumeView";
import { resume } from "@/lib/resume";

export default function ResumePage() {
  return <ResumeView resume={resume} />;
}