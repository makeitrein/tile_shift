import React from "react";
import { DiscussionItem } from "./discussion-item";

export const DiscussionConversation = React.memo(() => (
  <section
    className="overflow-y-auto h-full pr-6"
    aria-labelledby="notes-title"
  >
    <div className=" sm:rounded-lg sm:overflow-hidden">
      <div className="divide-y divide-gray-200">
        <div className="py-6 mt-4">
          <ul className="space-y-4">
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
            <DiscussionItem />
          </ul>
        </div>
      </div>
    </div>
  </section>
));
