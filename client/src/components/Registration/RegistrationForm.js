import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import FormControl from "@mui/material/FormControl";
import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import Form from "../Form";
import LanguageDropdown from "./LanguageDropdown";
import LocationDropdown from "./LocationDropdown";
import InterestsDropdown from "./InterestsDropdown";

export default function RegistrationForm() {
  return (
    <Form
      submit={(form) => {
        console.log("FORM", form);
      }}
      formInitialValues={{
        age: "",
        gender: "",
        location: {},
        occupation: "",
        education: "",
        languages: [],
        interests: [],
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">A Few More Details...</Typography>
        </Grid>

        <Grid item xs={6}>
          <FormInput label="Age" name="age" type="number" required />

          <FormSelect
            label="Gender"
            name="gender"
            required
            menu={[
              { val: "Male", label: "Male" },
              { val: "Female", label: "Female" },
              { val: "Non-Binary", label: "Non-Binary" },
            ]}
          />

          <FormControl sx={{ mt: 5, width: 300 }}>
            <LocationDropdown
              label="Where I live now"
              required
              name="location"
            />
          </FormControl>

          <FormInput label="Occupation" name="occupation" />
          <FormInput label="Education" name="education" />
        </Grid>
        <Grid item xs={6}>
          <LanguageDropdown
            label="Languages I speak"
            name="languages"
            placeholder="Select A Language"
          />

          <InterestsDropdown
            label="General Interests"
            name="interests"
            placeholder="Select An Interest"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" size="large">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
}