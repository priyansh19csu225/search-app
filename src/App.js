import { CircularProgress, Container, Grid } from "@mui/material";
import "./App.css";
import SearchBar from "./components/searchPhotos/SearchBar";
import PhotoContainer from "./components/displayPhotos/PhotoContainer";
import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <center>
        <h1>Search Photos</h1>
        </center>
          <SearchBar
            setData={setData}
            loading={loading}
            setLoading={setLoading}
          />
      </header>
      <main>
        <Container
          sx={{ overflow: loading ? "hidden" : "auto", marginTop: "2rem" }}
          className="relative-Main"
          maxWidth="xl"
        >
          <Grid
            container
            alignContent="center"
            justifyContent="center"
            wrap="wrap"
          >
            {data &&
              data.map((picture, index) => (
                <Grid
                  key={index}
                  item
                  lg={4}
                  md={6}
                  sm={12}
                  zeroMinWidth
                  textAlign="center"
                >
                  <center>
                    <PhotoContainer key={picture.id} picture={picture} />
                  </center>
                </Grid>
              ))}
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
            zeroMinWidth
            mt={3}
            textAlign="center"
          >
            {loading && <CircularProgress size="10rem" />}
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default App;
