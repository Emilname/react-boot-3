const sortOrders = {
  ASC: "asc",
  DESC: "desc",
};

Object.freeze(sortOrders);

class Sorter {
  sortedFieldKey = null;
  sortOrder = sortOrders.ASC;

  constructor() {
    this.setDefaultSortOrder();
  }

  setDefaultSortOrder = () => {
    this.sortOrder = sortOrders.ASC;
  };

  sortAsc = (a, b) => {
    return Number(b[this.sortedFieldKey]) - Number(a[this.sortedFieldKey]);
  };
  sortDesc = (a, b) => {
    return Number(a[this.sortedFieldKey]) - Number(b[this.sortedFieldKey]);
  };

  switchSortOrder = () => {
    if (this.sortOrder == sortOrders.ASC) {
      this.sortOrder = sortOrders.DESC;
    } else {
      this.sortOrder = sortOrders.ASC;
    }
  };

  sortByField = (fieldKey, list) => {
    if (this.sortedFieldKey == fieldKey) {
      this.switchSortOrder();
    } else {
      this.setDefaultSortOrder();
    }
    this.sortedFieldKey = fieldKey;
    return list.sort(
      this.sortOrder == sortOrders.ASC ? this.sortAsc : this.sortDesc
    );
  };
}

export default Sorter;
