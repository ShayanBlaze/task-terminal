import React from "react";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
}

const GenericList = <T,>({
  items,
  renderItem,
  keyExtractor,
}: GenericListProps<T>) => {
  return (
    <>
      {items.map((item) => (
        <React.Fragment key={keyExtractor(item)}>
          {renderItem(item)}
        </React.Fragment>
      ))}
    </>
  );
};

export default GenericList;
