import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import ApplicationHeader from "./components/ApplicationHeader";
import { Page } from "./components/BasicStyledComponents";
import initializeI18N from "./i8n/init";
import Ingredient from "./pages/Ingredient";
import Pancake from "./pages/Pancake";
import Order from "./pages/Order";
initializeI18N();

const AppContent = styled.div``;
const App = () => (
    <BrowserRouter>
        <Page>
            <ApplicationHeader />
            <AppContent>
                <Routes>
                    <Route exact path={"/ingredients"} element={<Ingredient />}>
                    </Route>
                    <Route exact path={"/pancakes"} element={<Pancake />}>
                    </Route>
                    <Route exact path={"/orders"} element={<Order />}>
                    </Route>
                    <Route>
                        <Route path={"/"} element={<Ingredient />} />
                    </Route>
                </Routes>
            </AppContent>
        </Page>
    </BrowserRouter>
);

export default App;
