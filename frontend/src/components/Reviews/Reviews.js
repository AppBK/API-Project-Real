import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom';
import { RouterContext } from "../../context/RouterContext";
import { thunkEditSpot } from '../../store/spot';
import { useDispatch } from 'react-redux';
import { thunkSpotCreate } from '../../store/spot';
