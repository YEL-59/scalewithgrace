import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const AvatarGroup = ({
  children,
  max,
  className,
  ...props
}) => {
  const totalAvatars = React.Children.count(children);
  const displayedAvatars = React.Children.toArray(children)
    .slice(0, max)
    .reverse();
  const remainingAvatars = max ? Math.max(totalAvatars - max, 1) : 0;

  return (
    <div
      className={cn("flex items-center flex-row-reverse", className)}
      {...props}>
      {remainingAvatars > 0 && (
        <Avatar className="-ml-2 hover:z-10 relative ring-2 ring-background">
          <AvatarFallback className="bg-muted-foreground text-white">
            +{remainingAvatars}
          </AvatarFallback>
        </Avatar>
      )}
      {displayedAvatars.map((avatar, index) => {
        if (!React.isValidElement(avatar)) return null;

        return (
          <div key={index} className="-ml-2 hover:z-10 relative">
            {React.cloneElement(avatar, {
              className: "ring-2 ring-background",
            })}
          </div>
        );
      })}
    </div>
  );
};

export default function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback className="bg-indigo-500 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-green-600 text-white">CN</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-red-500 text-white">AB</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-indigo-500 text-white">VK</AvatarFallback>
      </Avatar>
      <Avatar className="-ml-2 first:ml-0 cursor-pointer">
        <AvatarFallback className="bg-orange-500 text-white">RS</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  );
}
