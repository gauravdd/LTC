import { Breadcrumb, SimpleCard } from 'app/components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editLTCPolicy } from './store/LTCPolicy.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditLTCPolicy = () => {
    const { id: LTCPolicyId } = useParams()

    const LTCPolicy = useSelector((state) =>
        state.LTCPolicy.entities.find(
            (LTCPolicy) => LTCPolicy.id.toString() === LTCPolicyId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [policyId, setPolicyId] = useState(LTCPolicy.policyId)
    const [coverageId, setCoverageId] = useState(LTCPolicy.coverageId)
    const [quoteId, setQuoteId] = useState(LTCPolicy.quoteId)

    const handlePolicyId = (e) => setPolicyId(e.target.value)
    const handleCoverageId = (e) => setCoverageId(e.target.value)
    const handleQuoteId = (e) => setQuoteId(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editLTCPolicy({
                id: LTCPolicyId,
                policyId,
                coverageId,
                quoteId,
            })
        )
        navigate('/LTCPolicy')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditLTCPolicy', path: '/LTCPolicy' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="policyId"
                                id="policyIdInput"
                                onChange={handlePolicyId}
                                value={policyId}
                                validators={['required']}
                                label="PolicyId"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="coverageId"
                                id="coverageIdInput"
                                onChange={handleCoverageId}
                                value={coverageId}
                                validators={['required']}
                                label="CoverageId"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="quoteId"
                                id="quoteIdInput"
                                onChange={handleQuoteId}
                                value={quoteId}
                                validators={['required']}
                                label="QuoteId"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditLTCPolicy
