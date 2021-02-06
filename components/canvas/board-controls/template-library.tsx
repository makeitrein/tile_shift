import { Button } from "@blueprintjs/core";
import { ArrowNarrowRightOutline, TruckOutline } from "heroicons-react";
import React from "react";
import {
  ArrowAnchorPlacement,
  ArrowBetweenDivs,
  ArrowsBetweenDivsContextProvider,
  LineOrientation,
} from "../../canvas/react-simple-arrows";
import { Tag } from "../tile-menu/tag-picker";

interface Props {}

export const TemplateLibrary = React.memo(({}: Props) => {
  return (
    <div>
      <h5 className="text-md font-bold mb-2">TileShift Templates</h5>

      <Button text="I want to make a decision" />
      <div className="flex items-center">
        <Tag name="Decision" />
        <ArrowNarrowRightOutline />
        <Tag name="Choice" />
      </div>
      <br />
      <br />

      <Button text="I want to make a decision" />

      <div className="flex items-center">
        <Tag name="Decision" />
        <ArrowNarrowRightOutline size={16} />
        <Tag name="Pro" />
        <Tag name="Con" />
      </div>

      <ArrowsBetweenDivsContextProvider debug>
        {({ registerDivToArrowsContext }) => (
          <>
            {/* the arrows can be placed anywhere, as they position themselves absolutely and will wait to display until coordinates are registered */}
            <ArrowBetweenDivs
              from={{ id: "sleep", placement: ArrowAnchorPlacement.TOP }}
              to={{ id: "code", placement: ArrowAnchorPlacement.BOTTOM }}
              orientation={LineOrientation.VERTICAL}
            />
            <ArrowBetweenDivs
              from={{ id: "code", placement: ArrowAnchorPlacement.RIGHT }}
              to={{ id: "shower", placement: ArrowAnchorPlacement.LEFT }}
              orientation={LineOrientation.HORIZONTAL}
            />

            {/* define your content and register each one of the divs by "id" into the context by ref */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 500,
                height: 300,
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flex: 1,
                }}
              >
                <div>
                  <div
                    ref={(div) =>
                      registerDivToArrowsContext({ id: "code", div })
                    }
                    style={{ padding: 15 }}
                  >
                    <TruckOutline />
                  </div>
                </div>
                <div>
                  <div
                    ref={(div) =>
                      registerDivToArrowsContext({ id: "shower", div })
                    }
                    style={{ padding: 15 }}
                  >
                    <TruckOutline />
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  flex: 1,
                }}
              >
                <div>
                  <div
                    ref={(div) =>
                      registerDivToArrowsContext({ id: "sleep", div })
                    }
                    style={{ padding: 15 }}
                  >
                    <TruckOutline />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </ArrowsBetweenDivsContextProvider>

      {/* <Button text="I want to scope a project" />
        <Button text="I want to test a thesis" />
        <Button text="I want to evaluate a product" />
        <Button text="I want to diagram an idea" /> */}
    </div>
  );
});
