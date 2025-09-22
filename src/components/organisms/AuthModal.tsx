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
import { useLogin, useRegister } from "../../http/mutations";
import { useAuth } from "../../utils/contexts/authenticationContext";
import type { AuthResponse } from "../../types/auth.types";

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
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data: AuthResponse) => {
          if (data && data.accessToken && data.user) {
            const mappedUser = {
              _id: String(data.user._id),
              first_name: data.user.username || "",
              last_name: "",
              contact_number: "",
              email: data.user.email,
              isAdmin: data.user.isAdmin,
            };
            authLogin(data.accessToken, "", mappedUser);
          }
          onClose();
        },
        onError: (err: unknown) => {
          setError(err instanceof Error ? err.message : "Login failed");
        },
      }
    );
  };

  const handleRegister = async (e: React.FormEvent) => {
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
    registerMutation.mutate(
      { name: fullName, email, password },
      {
        onSuccess: (data: AuthResponse) => {
          if (data && data.accessToken && data.user) {
            const mappedUser = {
              _id: String(data.user._id),
              first_name: data.user.username || "",
              last_name: "",
              contact_number: "",
              email: data.user.email,
              isAdmin: data.user.isAdmin,
            };
            authLogin(data.accessToken, "", mappedUser);
          }
          onClose();
        },
        onError: (err: unknown) => {
          setError(err instanceof Error ? err.message : "Registration failed");
        },
      }
    );
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
          {(loginMutation.isPending || registerMutation.isPending) && (
            <Text color="blue" size="sm" mb={8} ta="center">
              Processing...
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
