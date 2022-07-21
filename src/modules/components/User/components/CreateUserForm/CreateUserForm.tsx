import React, { useCallback, useEffect, useState } from 'react';
import { Form, Formik, Field } from 'formik';
import EmailField from 'modules/common/components/Fields/EmailField';
import { AddUserSchema } from 'modules/auth/utils';
import { INewUser, IUserTypes } from 'models/user';
import FirstName from 'modules/common/components/Fields/FirstName';
import LastName from 'modules/common/components/Fields/LastName';
import PasswordField from 'modules/common/components/Fields/PasswordField';
import RepeatPasswordField from 'modules/common/components/Fields/RepeatPasswordField';
import ButtonCreateUser from 'modules/common/components/Buttons/ButtonCreateUser/ButtonCreateUser';
import { FormattedMessage } from 'react-intl';
import './CreateUserForm.scss';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from 'modules/common/redux/thunk';
// import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { API_PATHS } from './../../../../../configs/api';

interface Props {
  onSubmit(values: INewUser): void;
  isLoading: boolean;
  errorMessage: string;
}

function CreateUserForm(props: Props) {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const { onSubmit, isLoading } = props;
  const [userTypesMem, setUserTypesMem] = useState([]);

  const getUserTypes = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.rolesList, 'post'));
    setUserTypesMem(json.data.administrator);
  }, [dispatch]);

  useEffect(() => {
    getUserTypes();
  }, []);

  const optionsUserTypes: IUserTypes[] = userTypesMem.map(
    (item: { name: string }): IUserTypes => ({
      value: item.name,
      label: item.name,
    }),
  );

  return (
    <div>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirm_password: '',
          membership_id: '',
          forceChangePassword: '',
          taxExempt: '',
          paymentRailsType: '',
          access_level: '',
          roles: [],
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onSubmit(values);
        }}
        validationSchema={AddUserSchema}
      >
        {({ touched, errors, values, handleChange }) => {
          return (
            <Form className="create-user-form row g-3 needs-validation">
              <h6>Email & password</h6>
              <FirstName error={errors.firstName} isTouched={touched.firstName} />
              <LastName error={errors.lastName} isTouched={touched.lastName} />
              <EmailField error={errors.email} isTouched={touched.email} />
              <PasswordField error={errors.password} isTouched={touched.password} />
              <RepeatPasswordField error={errors.confirm_password} isTouched={touched.confirm_password} />

              <div className="col-md-12">
                <label htmlFor="typePayment" className="form-label">
                  <FormattedMessage id="typePayment" />
                </label>

                <Field as="select" className="form-control" name="paymentRailsType" onChange={handleChange}>
                  <option value="">Choose here</option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </Field>
              </div>
              <div className="seperated-space"></div>

              <h6>Access information</h6>
              <div className="col-md-12">
                <label htmlFor="accessLevel" className="form-label">
                  <FormattedMessage id="accessLevel" />
                </label>

                <select className="form-control" name="access_level" onChange={handleChange}>
                  <option value="">Choose here</option>
                  <option value="10">Vendor</option>
                  <option value="100">Admin</option>
                </select>
              </div>

              {values.access_level === '100' && (
                <div className="col-md-12">
                  <label htmlFor="roles" className="form-label">
                    <FormattedMessage id="roles" />
                  </label>

                  <Field as="div" className="roles-box" name="roles" onChange={handleChange}>
                    <Select options={optionsUserTypes} placeholder="" isMulti></Select>
                  </Field>
                </div>
              )}

              <div className="col-md-12">
                <label htmlFor="membership" className="form-label">
                  <FormattedMessage id="membership" />
                </label>

                <Field as="select" className="form-control" name="membership_id" onChange={handleChange}>
                  <option value="">Ignore Membership</option>
                  <option value="4">General</option>
                </Field>
              </div>

              <div className="col-md-12">
                <label htmlFor="" className="form-label">
                  Require to change password on next log in
                </label>

                <Field type="checkbox" name="forceChangePassword" onChange={handleChange} />
              </div>
              <div className="seperated-space"></div>

              <h6>Tax information</h6>
              <div className="col-md-12">
                <label htmlFor="Tax exempt" className="form-label">
                  Tax exempt
                </label>

                <Field type="checkbox" name="taxExempt" onChange={handleChange} />
              </div>

              <ButtonCreateUser isLoading={isLoading} />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CreateUserForm;
