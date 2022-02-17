import {Form, TextArea, Button} from 'semantic-ui-react'
import _ from 'lodash'
import {BuildField} from '../../form/fields/field'
import SingleSelected from '../../components/selected/single.selected'
import MenuTabForm from './tab'

const MenuForm = (props) => {
    let {
        isShowTabMenu,
        onShowFieldError,
        onShowFieldErrorRemain,
        model,
        isLoading,
        isFormValid,
        handleChange,
        onHandleAction,
        customErrorRemain,
        currentList,
        handleDropdownChange,
        hasPermission
    } = props

    return (
        <Form>
            {
                isShowTabMenu && <MenuTabForm />
            }
            <BuildField
                fieldItem = {_.get(model, 'title')}
                fieldType = 'text'
                handleChange = {handleChange}
                isLoading = {isLoading}
                customErrorRemain = {customErrorRemain}
                onShowFieldError = {onShowFieldError}
                onShowFieldErrorRemain = {onShowFieldErrorRemain}
            />
            <Form.Field>
                <label>{_.get(model, 'excerpt')?.label}</label>
                <TextArea name={'excerpt'}
                className={onShowFieldError(_.get(model, 'excerpt')) ? 'error' : ''}
                disabled={!!isLoading}
                value={_.get(model, 'excerpt').value || ''}
                onChange={handleChange} placeholder={`${_.get(model, 'excerpt')?.label} ...`} />
                {/* Error remain */}
                {onShowFieldErrorRemain(_.get(model, 'excerpt'), customErrorRemain, isLoading)}
            </Form.Field>

            <Form.Field>
                <label>Select parrent</label>
                {
                    currentList && <SingleSelected
                        currentValue={_.get(model, 'parentId').value}
                        options={currentList}
                        onHandleChange={handleDropdownChange}
                    />
                }
            </Form.Field>
            <Form.Field>
                <Button
                    disabled={!isFormValid || !!isLoading || !hasPermission}
                    loading={!!isLoading}
                    onClick={isFormValid ? ((onHandleAction && typeof onHandleAction === 'function') ? onHandleAction : null) : null}
                    type='submit'>Save changed</Button>
            </Form.Field>
        </Form>
    )
}

export default MenuForm