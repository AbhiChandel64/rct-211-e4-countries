import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";

const getCountriesURL = "http://localhost:8080/countries";

export const Editpage = (props) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState();

  const countryId = window.location.pathname.split("/")[2];

  useEffect(() => {
    axios
      .get(getCountriesURL)
      .then(({ data }) => {
        setFilteredCountry(data.find(({ id }) => id == countryId));
        setCountries(data);
      })
      .catch((err) => {
        console.log(
          err,
          "Please check if data server is running, try npm run server"
        );
      });
  }, [countryId]);

  if (!filteredCountry) {
    return <></>;
  }

  return (
    <Box>
      <Heading>Edit Page</Heading>
      <Box>
        <Text>Capital City</Text>
        <Input data-cy="capital-city" placeholder={filteredCountry.city} />
      </Box>
      <Box>
        <Text>Population</Text>
        <Input data-cy="population" placeholder={filteredCountry.population} />
      </Box>
      <Button data-cy="update-button">Update</Button>
    </Box>
  );
};

export default Editpage;
