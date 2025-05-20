import React, { useState } from "react";
import { useSlotModal } from "@/providers/SlotBookProvider";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  additionalInfo: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the consent checkbox",
  }),
});

type FormData = z.infer<typeof schema>;

const SlotBookModal = () => {
  const { showModal, setShowModal } = useSlotModal();

  const [formValues, setFormValues] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    additionalInfo: "",
    consent: false,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: formValues,
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Meeting Scheduled:", data);
    console.log("Form Values:", formValues);
    setFormValues(data);
    setShowModal(false);
    reset();
  };

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Box
        sx={{
          width: "80%",
          maxWidth: 900,
          margin: "5% auto",
          backgroundColor: "#121212",
          color: "white",
          borderRadius: 2,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 4,
            borderRight: "1px solid #333",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#1e1e1e",
          }}
        >
          <Typography variant="h6" gutterBottom>
            test
          </Typography>
          <Typography variant="body1">🕒 30 Mins</Typography>
          <Typography variant="body1">
            📅 08:30 AM - 09:00 AM , Fri, Jun 13, 2025
          </Typography>
          <Typography variant="body1">🌍 America/New_York (EDT)</Typography>
        </Box>

        <Box sx={{ flex: 2, p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Enter Details
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" gap={2} mb={2}>
              <TextField
                fullWidth
                label="First Name"
                autoComplete="off"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="outlined"
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                autoComplete="off"
                helperText={errors.lastName?.message}
                variant="outlined"
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </Box>

            <Box display="flex" gap={2} mb={2}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <div style={{ width: "100%" }}>
                    <PhoneInput
                      country={"in"}
                      inputStyle={{
                        width: "100%",
                        borderColor: errors.phone ? "#d32f2f" : "#ccc",
                      }}
                      specialLabel="Phone"
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoComplete: "off",
                      }}
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                        setFormValues((prev) => ({ ...prev, phone: value }));
                      }}
                    />
                    {errors.phone && (
                      <Typography variant="caption" color="error">
                        {errors.phone.message}
                      </Typography>
                    )}
                  </div>
                )}
              />
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="off"
                variant="outlined"
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </Box>

            <TextField
              fullWidth
              label="Additional Information"
              multiline
              minRows={3}
              {...register("additionalInfo")}
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  additionalInfo: e.target.value,
                }))
              }
            />

            <FormControlLabel
              control={
                <Controller
                  name="consent"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.checked);
                        setFormValues((prev) => ({
                          ...prev,
                          consent: e.target.checked,
                        }));
                      }}
                    />
                  )}
                />
              }
              label={
                <Typography variant="body2">
                  I confirm that I want to receive content from this company
                  using any contact information I provide.
                </Typography>
              }
            />
            {errors.consent && (
              <Typography variant="caption" color="error">
                {errors.consent.message}
              </Typography>
            )}

            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Schedule Meeting
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default SlotBookModal;
