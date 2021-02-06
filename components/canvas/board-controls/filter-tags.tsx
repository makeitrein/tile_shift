import { Intent } from "@blueprintjs/core";
import { MultiSelect } from "@blueprintjs/select";
import * as React from "react";

const FilmMultiSelect = MultiSelect.ofType<IFilm>();

const INTENTS = [
  Intent.NONE,
  Intent.PRIMARY,
  Intent.SUCCESS,
  Intent.DANGER,
  Intent.WARNING,
];

export const FilterTags = () => {
  // const clearButton =
  //     films.length > 0 ? <Button icon="cross" minimal={true} onClick={this.handleClear} /> : undefined;

  return (
    <MultiSelect
    // createNewItemFromQuery={maybeCreateNewItemFromQuery}
    // createNewItemRenderer={maybeCreateNewItemRenderer}
    // initialContent={initialContent}
    // itemRenderer={this.renderFilm}
    // itemsEqual={areFilmsEqual}
    // we may customize the default filmSelectProps.items by
    // adding newly created items to the list, so pass our own
    // items={this.state.items}
    // noResults={<MenuItem disabled={true} text="No results." />}
    // onItemSelect={this.handleFilmSelect}
    // onItemsPaste={this.handleFilmsPaste}
    // popoverProps={{ minimal: popoverMinimal }}
    // tagRenderer={this.renderTag}
    // tagInputProps={{
    //     onRemove: this.handleTagRemove,
    //     rightElement: clearButton,
    //     tagProps: getTagProps,
    // }}
    // selectedItems={this.state.films}
    />
  );
};
