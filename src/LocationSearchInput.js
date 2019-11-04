import React from "react";
import { Input, Flex, Button, Box, Text, Spinner, FormControl, FormLabel } from "@chakra-ui/core";
import { GRID_UNIT } from './constants';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({
      address
    });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.props.onCoordsReady(latLng);
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <FormControl>
        <FormLabel>Enter a date location</FormLabel>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <Box>
              <Input
                size="lg"
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input"
                })}
              />

              <Box>
                <Box paddingBottom={`${GRID_UNIT}px`}/>
                {loading && <Spinner />}

  
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <Box paddingBottom={`${GRID_UNIT}px`} key={suggestion.id}>
                      <Text
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </Text>
                    </Box>
                  );
                })}
                </Box>
            </Box>
          )}
        </PlacesAutocomplete>
      </FormControl>
    );
  }
}
