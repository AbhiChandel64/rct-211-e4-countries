import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Td,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const getCountriesURL = "http://localhost:8080/countries";

const Homepage = () => {
  const [sort, setSort] = useState("desc");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(getCountriesURL)
      .then(({ data }) =>
        setCountries(
          data.sort((a, b) =>
            sort === "asc"
              ? a.population - b.population
              : b.population - a.population
          )
        )
      )
      .catch((err) => {
        console.log(
          err,
          "Please check if data server is running, try npm run server"
        );
      });
  }, [sort]);

  return (
    <Box w="100%">
      <Flex padding="0 1rem" mb="2rem">
        <Text fontWeight="700" paddingRight="1rem">
          Sort by country population
        </Text>
        <RadioGroup onChange={setSort}>
          <Stack direction="row">
            <Radio data-cy="asc" value="asc">
              Ascending
            </Radio>
            <Radio data-cy="desc" value="desc">
              Descending
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Country</Th>
              <Th>Capital</Th>
              <Th>Population</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody data-cy="table-body">
            {countries.map(({ id, country, city, population }) => (
              <Tr id={id}>
                <Td>{country}</Td>
                <Td>{city}</Td>
                <Td isNumeric>{population}</Td>
                <Td>
                  <Button
                    colorScheme="teal"
                    size="xs"
                    onClick={() => {
                      window.location.href = `http://localhost:3000/country/${id}`;
                    }}
                  >
                    Edit
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="red" size="xs">
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Homepage;
