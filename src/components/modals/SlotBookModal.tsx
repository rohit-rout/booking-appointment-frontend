import React from "react";
import { useSlotModal } from "@/providers/SlotBookProvider";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { postData } from "@/lib/service/fetcher";
import dayjs from "dayjs";
import timezonePlugin from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useQueryClient } from "@tanstack/react-query";
import { formatDate } from "@/lib/utils/helper";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

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
  const { showModal, slotTiming, setShowModal, setSlotTiming } = useSlotModal();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      additionalInfo: "",
      consent: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!slotTiming?.date || !slotTiming?.time || !slotTiming?.timezone) {
      return;
    }

    const requestBody = {
      date: slotTiming.date,
      time: slotTiming.time,
      timezone: slotTiming.timezone.value,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };

    try {
      const res = await postData(
        "http://localhost:8080/api/slots",
        requestBody
      );

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 1000)
      );

      queryClient.invalidateQueries({ queryKey: ["slots"] });

      if (!res.success) {
        console.error("Failed to schedule slot:", res.message || res);
        return;
      }

      reset();
      setShowModal(false);
      setSlotTiming({ timezone: null, time: null, date: null });
    } catch (error) {
      console.error("Error scheduling meeting:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSlotTiming({ timezone: null, time: null, date: null });
  };

  return (
    <Modal open={showModal} onClose={closeModal}>
      <Box
        sx={{
          width: "90%",
          maxWidth: 960,
          margin: "5% auto",
          backgroundColor: "#181818",
          color: "white",
          borderRadius: 4,
          boxShadow: 24,
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            p: 4,
            borderRight: "1px solid #333",
            background: "linear-gradient(135deg, #1e1e1e, #111)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            📌 Meeting Details
          </Typography>
          <Typography variant="body1">
            🕒 Duration: <strong>30 Mins</strong>
          </Typography>
          <Typography variant="body1">
            📅 Date:{" "}
            <strong>
              {formatDate(slotTiming.date ?? "", slotTiming.time ?? "", 30)}
            </strong>
          </Typography>
          <Typography variant="body1">
            🌍 Timezone: <strong>{slotTiming?.timezone?.label || "N/A"}</strong>
          </Typography>
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
              />
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                autoComplete="off"
                helperText={errors.lastName?.message}
                variant="outlined"
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
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
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
                      onChange={(e) => field.onChange(e.target.checked)}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isValid || isSubmitting}
                startIcon={
                  isSubmitting ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
              >
                {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default SlotBookModal;
