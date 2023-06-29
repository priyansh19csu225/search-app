/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Stack, TextField } from "@mui/material";
import debounce from "lodash/debounce";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import STORAGE_KEY from "../../constants/storagekey";
import { getRequest } from "../../networkcalls/requests";
import API_URL from "../../constants/apiurl";

function SearchBar(props) {
  const { setData, loading, setLoading } = props;
  const [searchKey, setSearchKey] = useState("");
  const [options, setOptions] = useState(() => {
    const previousSearchRequests = localStorage.getItem(
      STORAGE_KEY.RECENT_SEARCHES
    );
    return JSON.parse(previousSearchRequests) || [];
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleRecentSearches = (event) => {
    const previousSearchRequests = localStorage.getItem(
      STORAGE_KEY.RECENT_SEARCHES
    );
    const value = event.target.value;
    if (value === "" || options.some((option) => option === value)) return;
    let updatedSearchRequests = [];

    if (previousSearchRequests) {
      const parsedSearchRequests = JSON.parse(previousSearchRequests);
      updatedSearchRequests = [value, ...parsedSearchRequests];
    } else {
      updatedSearchRequests = [value];
    }
    setOptions(updatedSearchRequests);
    localStorage.setItem(
      STORAGE_KEY.RECENT_SEARCHES,
      JSON.stringify(updatedSearchRequests)
    );
  };

  const deb = useCallback(
    debounce((key) => {
      setSearchKey(key);
    }, 400),
    []
  );

  const handleSearchKey = (key) => {
    deb(key);
  };

  useEffect(() => {
    if (!loading) return;

    const fetchData = async () => {
      try {
        let response;
        if (searchKey === "") {
          response = await getRequest(`${API_URL.DEFAULT}page=${page}`);
        } else {
          response = await getRequest(
            `${API_URL.SEARCH}page=${page}&text=${searchKey}`
          );
        }
        const { photos } = response;
        setData((prevData) => {
          return [...prevData, ...photos.photo];
        });
        setTotalPages(photos.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  useEffect(() => {
    setData([]);
    setPage(1);

    setLoading(true);
  }, [searchKey]);

  useEffect(() => {
    setLoading(true);
  }, [page]);

  const handleInfiniteScroll = useCallback(async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight &&
        page <= totalPages
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [handleInfiniteScroll]);

  return (
    <Stack direction="row" spacing={2}>
      <Autocomplete
        disablePortal
        options={options}
        className={styles.searchBar}
        size="small"
        freeSolo
        renderInput={(params) => (
          <TextField {...params} autoFocus placeholder="Type here..." />
        )}
        renderOption={(props, option) => (
          <li
            {...props}
            onClick={(event) => {
              if (props.onClick) {
                props.onClick(event);
              }
              handleSearchKey(option);
            }}
          >
            {option}
          </li>
        )}
        onInputChange={(event) => handleSearchKey(event.target.value)}
        onBlur={(event) => handleRecentSearches(event)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchKey(e.target.value);
          }
        }}
      />
    </Stack>
  );
}

export default SearchBar;
