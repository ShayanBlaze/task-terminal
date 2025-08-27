import { IconType } from "react-icons";

declare module "react-icons" {
  export interface IconType {
    (props: React.SVGProps<SVGElement>): React.ReactElement | null;
  }
}
