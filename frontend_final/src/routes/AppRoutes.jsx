import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import RideHistory from "../pages/RideHistory";
import DriverPanel from "../pages/DriverPanel";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={
                    <MainLayout>
                        <Home />
                    </MainLayout>
                }
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <Dashboard />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/history"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <RideHistory />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/driver"
                element={
                    <ProtectedRoute>
                        <MainLayout>
                            <DriverPanel />
                        </MainLayout>
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}