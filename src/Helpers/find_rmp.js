import construct_url from "./construct_url";

/**
 *  Constructs a RMP search query for a given instructor name
 *
 *  @param {string} instructor - Instructor name
 */
function find_rmp(instructor) {
  let [last, first] = instructor.split(", ");

  // Remove middle name, as RMP doesn't include them
  first = first ? first?.replace(/\s.+/g, "") : first;

  return construct_url("https://www.ratemyprofessors.com/search/teachers", {
    "query": `${last}, ${first}`,
    "sid": "U2Nob29sLTExMTE=" // UIC's school id
  });
}

export default find_rmp;