import {
  Modal,
  TextInput,
  PasswordInput,
  Button,
  Group,
  Text,
  Box,
} from "@mantine/core";
import { useState } from "react";

interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
  mode: "login" | "register";
}

export default function AuthModal({ opened, onClose, mode }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    // TODO: Add login logic here
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // TODO: Add registration logic here
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      title={mode === "login" ? "Login" : "Register"}
    >
      <Box>
        <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
          {mode === "register" && (
            <TextInput
              label="Full name"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.currentTarget.value)}
              mb={16}
              required
            />
          )}
          <TextInput
            label="Email address"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            mb={16}
            required
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            mb={16}
            required
          />
          {mode === "register" && (
            <PasswordInput
              label="Confirm password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
              mb={16}
              required
            />
          )}
          {error && (
            <Text color="red" size="sm" mb={8} ta="center">
              {error}
            </Text>
          )}
          {mode === "login" ? (
            <Text size="sm" mt={8} mb={16} ta="center">
              New customer?{" "}
              <Button
                variant="subtle"
                size="xs"
                type="button"
                onClick={() => {}}
              >
                Create new account
              </Button>
            </Text>
          ) : (
            <Text size="sm" mt={8} mb={16} ta="center">
              Already have an account?{" "}
              <Button
                variant="subtle"
                size="xs"
                type="button"
                onClick={() => {}}
              >
                Log in here
              </Button>
            </Text>
          )}
          <Group justify="center" mt={16}>
            <Button fullWidth color="blue.7" type="submit">
              {mode === "login" ? "Log in" : "Register"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
