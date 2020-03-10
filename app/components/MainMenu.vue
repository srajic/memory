<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image class="logo" src="~/images/logo.png"></Image>
        <Label class="header text-left" text="LOG In"></Label>

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Email"
              :isEnabled="!processing"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="user.email"
              returnKeyType="next"
              @returnPress="focusPassword"
            ></TextField>

            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!processing"
              hint="Password"
              secure="true"
              v-model="user.password"
              :returnKeyType="isLoggingIn ? 'done' : 'next'"
              @returnPress="focusConfirmPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!processing"
              hint="Confirm password"
              secure="true"
              v-model="user.confirmPassword"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowspan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button
          :text="isLoggingIn ? 'Log In' : 'Sign Up'"
          :isEnabled="!processing"
          @tap="submit"
          class="btn btn-primary m-t-20"
        ></Button>
        <Label
          *v-show="isLoggingIn"
          text="Forgot your password?"
          class="login-label"
          @tap="forgotPassword()"
        ></Label>
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"></Span>
          <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import App from "./App.vue";
// import Items from "./Items";

export default {
  data() {
    return {
     
    };
  },
}
</script>

<style scoped lang="scss">

</style>
