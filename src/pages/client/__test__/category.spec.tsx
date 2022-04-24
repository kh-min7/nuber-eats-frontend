import { ApolloProvider } from "@apollo/client";
import { RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import React from "react";
import { render } from "../../../test-utils";
import { Category } from "../category";

describe("<CreateAccount />", () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Category />
        </ApolloProvider>
      );
    });
  });
  it("renders OK", async () => {
    await waitFor(() => expect(document.title).toBe("Category | Nuber Eats"));
  });
});

// ?
