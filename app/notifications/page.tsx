import Headings from "@/Components/ui/Headings";
import React, { FC } from "react";

interface NotificaitonPageProps {}

const page: FC<NotificaitonPageProps> = ({}) => {
  return (
    <main>
      <Headings
        title="Notifications"
        description="You can find all your notifications in this page"
      />
      
    </main>
  );
};

export default page;
